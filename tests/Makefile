default: install build
	@cd .. && open http://127.0.0.1:8000/tests/dist/test.html && python -m SimpleHTTPServer

build:
	@rm -rf dist
	@cp -r src dist
	@babel src -d dist -e 0

install:
	@npm install
