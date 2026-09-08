.PHONY: wipe start restart stop

wipe:
	docker compose down -v && docker compose up -d --build && docker compose logs -f

start:
	docker compose up -d && docker compose logs -f

restart:
	docker compose down && docker compose up -d && docker compose logs -f

stop:
	docker compose down