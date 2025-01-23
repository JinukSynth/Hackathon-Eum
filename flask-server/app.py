from flask import Flask, jsonify, Response, request
from flask_cors import CORS
from crawler import crawl_and_extract_places

app = Flask(__name__)
CORS(app)  # CORS 허용

urls = [
        "https://www.instagram.com/p/C-_ww4myW_2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "https://www.instagram.com/p/C83bxPWSVrc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "https://www.instagram.com/p/C9ZLs3kSWDn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "https://www.instagram.com/p/C85sA2rSueB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "https://www.instagram.com/p/C8LfQGKyD7o/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "https://www.instagram.com/p/C70JasSKOpk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "https://www.instagram.com/p/C7nRbt3vyHK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "https://www.instagram.com/p/C7fjCn2vUVD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "https://www.instagram.com/p/C5-IUI1S9mU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    ]    

@app.route('/api/data', methods=['GET'])
def get_data():
    results = []
    for url in urls:
        try:
            extracted_data = crawl_and_extract_places(url)
            if isinstance(extracted_data, list):
                for item in extracted_data:
                    if all(key in item for key in ['name', 'latitude', 'longitude', 'location', 'description', 'link']):
                        results.append({
                            "name": item['name'],
                            "location": item['location'],  # 위치(주소) 추가
                            "description": item['description'],  # 설명 추가
                            "latitude": item['latitude'],
                            "longitude": item['longitude'],
                            "link": item['link']  # 링크 정보 추가
                        })
            else:
                print(f"Unexpected data structure: {extracted_data}")
        except Exception as e:
            print(f"Error processing URL {url}: {str(e)}")
            return Response("An error occurred", status=500)
    
    return jsonify(results)

@app.route('/api/crawl', methods=['POST'])
def crawl_link():
    try:
        link = request.json.get('link')
        if not link:
            return jsonify({"error": "No link provided"}), 400
        
         # 링크를 크롤링하여 데이터를 추출
        extracted_data = crawl_and_extract_places(link)

        print(f"Crawled data for {link}: {extracted_data}")  # 디버그 출력 추가

        # 링크를 크롤링하여 데이터를 추출
        extracted_data = crawl_and_extract_places(link)
        
        # 크롤링된 데이터를 반환
        urls.append(link)  # 새 링크를 urls 리스트에 추가
        
        return jsonify(extracted_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


if __name__ == '__main__':
    app.run(debug=True, port=5001)