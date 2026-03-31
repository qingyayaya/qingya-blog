all: init

init:
	npm install
	npm link

.PHONY: all init