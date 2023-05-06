all:

init:
	npm install
	npm link
	cp 'assets/Empty Blog.md' ~/Templates

.PHONY:
	all init
