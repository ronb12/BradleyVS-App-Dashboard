#!/usr/bin/env bash
# GitHub Secret scanning — list or dismiss OPEN alerts via `gh api`.
#
# Prerequisites: `gh auth login` (token needs `repo` scope).
# Docs: https://docs.github.com/en/rest/secret-scanning#update-a-secret-scanning-alert
#
#   ./scripts/gh-secret-scanning-resolve.sh list ronb12/BarberBook-Pro
#   ./scripts/gh-secret-scanning-resolve.sh dismiss ronb12/BarberBook-Pro [false_positive|wont_fix|revoked|...]

set -euo pipefail

COMMENT='Demo credentials removed from default branch; not a live secret.'

usage() {
  echo "Usage: $0 list OWNER/REPO"
  echo "       $0 dismiss OWNER/REPO [resolution]"
  echo "Resolutions: false_positive | wont_fix | revoked | used_in_tests | pattern_deleted | pattern_edited"
  exit 1
}

command -v gh >/dev/null || { echo "Install GitHub CLI: https://cli.github.com/"; exit 1; }

[[ $# -lt 2 ]] && usage
cmd="$1"
repo="$2"
resolution="${3:-wont_fix}"

case "$cmd" in
  list)
    echo "Open secret scanning alerts: $repo"
    gh api "repos/${repo}/secret-scanning/alerts?state=open&per_page=100" --jq '.[] | {number, state, secret_type: .secret_type, url: .html_url}' 2>/dev/null \
      || gh api "repos/${repo}/secret-scanning/alerts?state=open&per_page=100"
    cnt="$(gh api "repos/${repo}/secret-scanning/alerts?state=open&per_page=100" --jq 'length' 2>/dev/null || echo 0)"
    echo "Open count: $cnt"
    ;;
  dismiss)
    nums="$(gh api "repos/${repo}/secret-scanning/alerts?state=open&per_page=100" --jq '.[].number' 2>/dev/null || true)"
    if [[ -z "${nums//[$'\n'' ''\t']/}" ]]; then
      echo "No open secret scanning —nothing to dismiss for $repo."
      exit 0
    fi
    while IFS= read -r num; do
      [[ -z "$num" ]] && continue
      echo "PATCH alert #$num → resolved ($resolution)"
      gh api --method PATCH "repos/${repo}/secret-scanning/alerts/${num}" \
        -f state=resolved \
        -f resolution="$resolution" \
        -f resolution_comment="$COMMENT"
    done <<< "$nums"
    echo "Done."
    ;;
  *) usage ;;
esac
