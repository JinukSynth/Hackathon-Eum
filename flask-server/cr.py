# # 2024.07.27
# # <인스타그램 크롤링>
# # 1. 단일 장소 성공
# # 2. 복수 장소 성공
# # 3. 네이버 블로그 실패

# import requests
# from bs4 import BeautifulSoup
# from PyKakao import Local
# import re
# import pandas as pd

# # 클로바 API
# class CompletionExecutor:
#     def __init__(self, host, api_key, api_key_primary_val, request_id):
#         self.host = host
#         self.api_key = api_key
#         self.api_key_primary_val = api_key_primary_val
#         self.request_id = request_id

#     def execute(self, prompt):
#         headers = {
#             'X-NCP-CLOVASTUDIO-API-KEY': self.api_key,
#             'X-NCP-APIGW-API-KEY': self.api_key_primary_val,
#             'X-NCP-CLOVASTUDIO-REQUEST-ID': self.request_id,
#             'Content-Type': 'application/json; charset=utf-8'
#         }

#         data = {
#             'messages': [{"role": "system", "content": ""}, {"role": "user", "content": prompt}],
#             'topP': 0.8,
#             'topK': 0,
#             'maxTokens': 256,
#             'temperature': 0.5,
#             'repeatPenalty': 5.0,
#             'stopBefore': [],
#             'includeAiFilters': True,
#             'seed': 0
#         }

#         response = requests.post(f'{self.host}/testapp/v1/chat-completions/HCX-003', headers=headers, json=data)
#         return response.json()

# # 장소, 주소(본문)추출 함수
# def extract_place_and_address(text):
#     # 프롬프트 설정
#     prompt = f"""
#     주어진 본문에서 모든 장소명과 주소를 각각 추출하세요. 각 장소명과 주소는 콜론(:)으로 구분하고, 여러 장소명이 있다면 모두 추출해주세요.
    
#     본문:
#     {text}
    
#     장소명:
#     주소:
#     """

#     # 클로바 API 실행
#     completion_executor = CompletionExecutor(
#         host='https://clovastudio.apigw.ntruss.com',  # 엔드포인트 
#         api_key='NTA0MjU2MWZlZTcxNDJiY2OxnDTnKP+Bddm8Xq/usOV64RWRKI07GZkdKKrajCju',
#         api_key_primary_val='JtLswqHIE53k5YLS5sFyuomlZe6NY6fmfGWcggVk',
#         request_id='88475ba0-1214-4ecf-9a9f-7ac44b634313'
#     )

#     result = completion_executor.execute(prompt)
    
#     if 'result' in result and 'message' in result['result']:
#         content = result['result']['message']['content']
        
#         # 필요한 정보 추출
#         lines = content.split('\n')
#         places = [line.split(':')[1].strip() for line in lines if '장소명' in line]
#         addresses = [line.split(':')[1].strip() for line in lines if '주소' in line]
#         print(f"Extracted places(추출한 장소): {places}")  # 디버깅용 출력
#         print(f"Extracted addresses(추출한 주소): {addresses}")  # 디버깅용 출력
#         return places, addresses
#     else:
#         return [], []

# # URL 유효성 검사
# def is_valid_url(url):
#     try:
#         response = requests.head(url)
#         return response.status_code == 200
#     except requests.RequestException:
#         return False

# # HTML 가져오기
# def fetch_html_content(url):
#     response = requests.get(url)
#     return response.text

# # Instagram 본문 추출 함수
# def extract_content_instagram(html_content):
#     soup = BeautifulSoup(html_content, 'html.parser')
#     content = soup.find('meta', {'property': 'og:description'})['content']
#     return content

# # # 네이버 블로그 추출 로직(27일 기준 아직 미개발)
# # def extract_content_naver(html_content):
# #     soup = BeautifulSoup(html_content, 'html.parser')
    
# #     # 제목 추출
# #     title = soup.select_one('div.se-title-text')
# #     if title:
# #         title = title.text.strip()
# #     else:
# #         title = "제목을 찾을 수 없습니다."
    
# #     # 본문 추출
# #     content_divs = soup.select('div.se-component.se-text.se-l-default')
# #     if content_divs:
# #         content = '\n'.join([div.text.strip() for div in content_divs])
# #     else:
# #         # 이전 버전의 네이버 블로그 구조 확인
# #         content_divs = soup.select('div.post-view')
# #         if content_divs:
# #             content = '\n'.join([div.text.strip() for div in content_divs])
# #         else:
# #             content = "본문을 찾을 수 없습니다."
    
# #     # 불필요한 문자 제거
# #     content = re.sub(r'\s+', ' ', content)
    
# #     return f"제목: {title}\n\n본문: {content}"

# # 카카오맵 API, 장소 검색
# def search_place_kakao(keyword):
#     api = Local(service_key='c42fff211f1cda9a417c797f19812a58')  # 발급받은 REST API 키로 교체
#     try:
#         df = api.search_keyword(keyword, dataframe=True)
#     except requests.exceptions.RequestException as e:
#         print(f"Request error: {e}")
#         df = pd.DataFrame()
#     return df


# # 카카오맵 검색 결과(장소 리스트 추출)
# def get_place_candidates(place_names):
#     all_candidates = {}
#     for place_name in place_names:
#         if not place_name.strip():
#             continue
#         search_results = search_place_kakao(place_name)
#         if search_results is not None and not search_results.empty:
#             candidates = search_results.head(4)  # 상위 3-4개 장소 후보 가져오기
#             candidate_list = []
#             for index, place in candidates.iterrows():
#                 candidate = {
#                     "Place Name": place['place_name'],
#                     "Address": place['address_name'],
#                     "Road Address": place['road_address_name'],
#                     "Place URL": place['place_url']
#                 }
#                 candidate_list.append(candidate)
#             all_candidates[place_name] = candidate_list
#         else:
#             all_candidates[place_name] = "[해당 키워드는 결과 확인 불가]"
#     return all_candidates

# # 포맷팅 후 출력
# def format_output(result):
#     content = result.get("content", "No content available")
#     places = result.get("places", {})
    
#     output = f"\n(게시글 본문)Extracted Content(+ 좋아요 + 조회수):\n{content}\n\n<카카오맵 검색 결과>\n"
    
#     for place_name, candidates in places.items():
#         if isinstance(candidates, str):
#             output += f"\n{place_name}: {candidates}\n"
#         else:
#             output += f"|------------------------------------------------|\n\n[검색한 장소: {place_name}]\n\n"
#             for candidate in candidates:
#                 output += (
#                     f"Place Name: {candidate['Place Name']}\n"
#                     f"Address: {candidate['Address']}\n"
#                     f"Road Address: {candidate['Road Address']}\n"
#                     f"Place URL: {candidate['Place URL']}\n\n"
#                 )
#     return output

# def crawl_and_extract_places(url):
#     if not is_valid_url(url):
#         return {"error": "Invalid URL"}
    
#     html_content = fetch_html_content(url)
    
#     if 'instagram.com' in url:
#         content = extract_content_instagram(html_content)
#     # elif 'naver.com' in url:
#     #     content = extract_content_naver(html_content)
#     else:
#         return {"error": "Unsupported URL"}

#     if not content:
#         return {"error": "No content extracted"}
    
#     places, addresses = extract_place_and_address(content)
#     print(f"\nExtracted places from content(추출한 장소): {places}")  # 디버깅용 출력
    
#     if not places:
#         return {"error": "No place names extracted"}
    
#     # 복합적으로 추출된 장소명 분리
#     separated_places = []
#     for place in places:
#         separated_places.extend(re.split('[,()]\s*', place))
#     separated_places = [p.strip() for p in separated_places if p.strip()]
    
#     place_candidates = get_place_candidates(separated_places)
    
#     return {"content": content, "places": place_candidates}

# # 실행
# if __name__ == "__main__":
#     test_url = "https://www.instagram.com/p/C9UHdTOSDRB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="  # 실제 링크로 교체
#     result = crawl_and_extract_places(test_url)
#     formatted_result = format_output(result)
#     print(formatted_result)

# # https://www.instagram.com/reel/C9rXHGOMCC9/?utm_source=ig_web_copy_link ( 링크: 계곡(복수) )
# # https://www.instagram.com/reel/C9cLQSVMlvi/?utm_source=ig_web_copy_link ( 링크: 장호항(단일) )