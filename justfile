wipe:
    docker compose down -v
    docker compose up -d --build
    docker compose logs -f

start service="all":
    #!/usr/bin/env bash
    if [[ "{{service}}" == "all" ]]; then
        docker compose up -d
        docker compose logs -f
    elif [[ "{{service}}" == "api" ]]; then
        cd ./api
        ./gradlew bootRun -q --console=plain
    elif [[ "{{service}}" == "db" ]]; then
        docker compose up -d database database_ui
        docker compose logs -f
    else
        docker compose up -d "{{service}}"
        docker compose logs -f
    fi

stop:
    docker compose down

restart:
    just stop
    just start

status service="all":
    #!/usr/bin/env bash
    set -euo pipefail

    G=$'\e[32m'; Y=$'\e[33m'; R=$'\e[31m'; N=$'\e[0m'

    raw=$(docker compose ps --all --format json)

    rows=$(echo "$raw" | jq -r '[.Service, .State, ([.Publishers[]?.PublishedPort | select(. != 0)] | unique | join(","))] | @tsv')

    if [[ "{{service}}" != "all" ]]; then
        rows=$(echo "$rows" | awk -F'\t' -v s="{{service}}" '$1 == s')
    fi
    if [[ -z "$rows" ]]; then echo "no match"; exit 1; fi

    while IFS=$'\t' read -r name state port; do
        case "$state" in
            running)    c=$G; label="Up" ;;
            restarting) c=$Y; label="Restarting" ;;
            *)          c=$R; label="Down" ;;
        esac
        printf "%-14s status: %s%-10s%s port: %s\n" "$name" "$c" "$label" "$N" "${port:--}"
    done <<< "$rows"

lint-api:
    #!/usr/bin/env bash
    cd ./api
    ./gradlew checkstyleMain --rerun 2>&1 | \
    grep --color=never -oP '(?<=com/example/saver/).*' || true