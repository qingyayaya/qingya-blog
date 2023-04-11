all:

init:
	npm install
	npm link
	qingya --init

.PHONY:
	all init