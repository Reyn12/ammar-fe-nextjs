.PHONY: help install dev build start lint clean

help: ## Tampilkan daftar perintah
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install dependency (npm install)
	npm install

dev: ## Jalankan dev server
	npm run dev

build: ## Build production
	npm run build

start: ## Jalankan production server (butuh build dulu)
	npm run start

lint: ## Cek lint
	npm run lint

clean: ## Hapus folder build (.next)
	rm -rf .next
