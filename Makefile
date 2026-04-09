.PHONY: install frontend backend submit

# Project root (where this Makefile lives)
ROOT := $(CURDIR)

install:
	@bash -c 'set -a && [ -f "$(ROOT)/.env" ] && . "$(ROOT)/.env"; set +a; \
		cd "$(ROOT)/backend" && python3 -m pip install -r requirements.txt && \
		cd "$(ROOT)" && npm install'

frontend:
	cd "$(ROOT)" && npm start

backend:
	cd "$(ROOT)/backend" && python3 chat.py

# Creates a zip of exactly what Git tracks (node_modules, .env, etc. are not tracked).
# Usage: make submit STUDENT_NAME="Ada Lovelace" STUDENT_EMAIL="ada@example.edu"
submit:
ifeq ($(strip $(STUDENT_NAME)),)
	$(error STUDENT_NAME is required, e.g. make submit STUDENT_NAME="Ada Lovelace" STUDENT_EMAIL="ada@example.edu")
endif
ifeq ($(strip $(STUDENT_EMAIL)),)
	$(error STUDENT_EMAIL is required, e.g. make submit STUDENT_NAME="Ada Lovelace" STUDENT_EMAIL="ada@example.edu")
endif
	@SAFE_NAME=$$(echo "$(STUDENT_NAME)" | sed 's/[^a-zA-Z0-9._-]/_/g'); \
	SAFE_EMAIL=$$(echo "$(STUDENT_EMAIL)" | sed 's/@/_at_/g' | sed 's/[^a-zA-Z0-9._-]/_/g'); \
	OUT="$(ROOT)/pokechat-submit-$${SAFE_NAME}-$${SAFE_EMAIL}.zip"; \
	git -C "$(ROOT)" archive --format=zip -o "$$OUT" HEAD && \
	echo "Created $$OUT"
