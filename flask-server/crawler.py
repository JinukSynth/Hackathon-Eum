import os
from bs4 import BeautifulSoup
from PyKakao import Local
import pandas as pd
import requests
import openai

# OpenAI API 클래스
class CompletionExecutor:
    def __init__(self, api_key):
        self.api_key = self.api_key = os.getenv('OPENAI_API_KEY')

    def execute(self, prompt):
        headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
        data = {
            'model': 'gpt-3.5-turbo',
            'messages': [{"role": "user", "content": prompt}],
            'max_tokens': 256,
            'temperature': 0.5
        }
        try:
            response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"API 호출 실패: {e}")
            return None

def extract_place_and_address(text):
    prompt = f"""
    아래 본문에서 장소명, 주소, 그리고 해당 장소에 대한 설명을 추출해주세요. 설명은 본문을 요약해서 친근하게 작성해주세요.
    
    본문:
    {text}
    
    출력 형식:
    장소명: [장소명]
    주소: [주소]
    설명: [친근한 요약]
    """

    completion_executor = CompletionExecutor()
    result = completion_executor.execute(prompt)
    if result is None or 'choices' not in result:
        print("API 호출 실패 또는 빈 응답")
        return [], [], []

    content = result['choices'][0]['message']['content']
    lines = content.split('\n')
    places = [line.split(':')[1].strip() for line in lines if '장소명' in line]
    addresses = [line.split(':')[1].strip() for line in lines if '주소' in line and len(line.split(':')) > 1]
    descriptions = [line.split(':')[1].strip() for line in lines if '설명' in line and len(line.split(':')) > 1]
    return places, addresses, descriptions

def is_valid_url(url):
    try:
        response = requests.head(url)
        return response.status_code == 200
    except requests.RequestException:
        return False

def fetch_html_content(url):
    try:
        response = requests.get(url)
        if response.ok:
            return response.text
        else:
            return None
    except requests.RequestException as e:
        print(f"HTML content fetch error: {e}")
        return None

def extract_content_instagram(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    meta_tag = soup.find('meta', {'property': 'og:description'})
    if meta_tag:
        return meta_tag.get('content', '')
    return ''

def search_place_kakao(keyword):
    service_key=os.getenv('KAKAO_API_KEY')
    api = Local(service_key)
    try:
        df = api.search_keyword(keyword, dataframe=True)
        return df
    except requests.exceptions.RequestException as e:
        print(f"KakaoMap API request error: {e}")
        return pd.DataFrame()

def get_place_candidates(place_names):
    all_candidates = {}
    for place_name in place_names:
        if not place_name.strip():
            continue
        df = search_place_kakao(place_name)
        if not df.empty:
            candidates = df.head(3)  # 상위 3개 결과만 선택
            candidate_list = []
            for index, place in candidates.iterrows():
                candidate = {
                    "Place Name": place['place_name'],
                    "Address": place['address_name'],
                    "Road Address": place['road_address_name'],
                    "Place URL": place['place_url'],
                    "latitude": place['y'],
                    "longitude": place['x']
                }
                candidate_list.append(candidate)
            all_candidates[place_name] = candidate_list
        else:
            all_candidates[place_name] = "[No results]"
    return all_candidates

def crawl_and_extract_places(url):
    if not is_valid_url(url):
        return {"error": "Invalid URL"}

    html_content = fetch_html_content(url)
    if not html_content:
        return {"error": "No HTML content fetched"}

    content = extract_content_instagram(html_content) if 'instagram.com' in url else ''
    if not content:
        return {"error": "No content extracted"}

    places, addresses, descriptions = extract_place_and_address(content)
    if not places:
        return {"error": "No place names extracted"}

    place_candidates = get_place_candidates(places)
    extracted_data = []
    for place_name, candidates in place_candidates.items():
        if candidates and isinstance(candidates, list):
            candidate = candidates[0]
            extracted_data.append({
                "name": place_name,
                "location": candidate['Address'],  # 위치는 주소로 표시
                "description": descriptions[places.index(place_name)],  # 설명은 크롤링된 본문을 요약한 결과
                "latitude": candidate['latitude'],
                "longitude": candidate['longitude'],
                "link": url  # 원본 링크 추가
            })

    return extracted_data

if __name__ == "__main__":
    test_url = "https://www.instagram.com/p/C9UHdTOSDRB/?utm_source=ig_web_copy_link"
    result = crawl_and_extract_places(test_url)
    print(result)
