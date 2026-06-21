import json
from collections import Counter
from datetime import datetime
from pathlib import Path
import re
import sys

CHAT_DIR = Path("src/chats/sona-ig")
OUTPUT_FILE = Path("instagram_stats_output.json")

love_rx = re.compile(r"i\s+lo+ve+\s+(you+|u|baby+|babe+)", re.I)
miss_rx = re.compile(r"miss(ed)?\s+(you|u)", re.I)
heart_rx = re.compile(
    r"(?:❤️|🧡|💛|💚|💙|💜|🖤|🤍|🤎|💔|💕|💞|💓|💗|💖|💘|💝|🫶|❣️|♥️|💟)"
)
emoji_rx = re.compile(
    r"[\U0001F300-\U0001FAFF\u2600-\u26FF\u2700-\u27BF]\ufe0f?",
    re.UNICODE,
)


def normalize_sender(sender: str) -> str:
    lower = sender.lower()
    if "vedant" in lower:
        return "Vedant"
    if any(keyword in lower for keyword in ["gold mine", "goldmine", "sona"]):
        return "Soniya"
    return sender


def fix_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    text = text.strip()
    try:
        return text.encode("latin1").decode("utf-8")
    except UnicodeError:
        return text


def count_emojis(text: str) -> list[str]:
    return emoji_rx.findall(text)


def load_chats() -> list[dict]:
    if not CHAT_DIR.exists():
        raise FileNotFoundError(f"Chat directory not found: {CHAT_DIR}")

    messages = []
    for path in sorted(CHAT_DIR.glob("*.json")):
        with path.open("r", encoding="utf-8") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError as exc:
                print(f"Skipping {path}: invalid JSON ({exc})")
                continue
        messages.extend(data.get("messages", []))
    return messages


def summarize(messages: list[dict]) -> dict:
    per_person = Counter()
    love_counts = Counter()
    month_counts = Counter()
    emoji_counts = Counter()
    missed = 0
    heart_total = 0
    day_set = set()

    for msg in messages:
        sender = normalize_sender(fix_text(msg.get("sender_name", "")))
        text = fix_text(msg.get("content", ""))
        if not text:
            continue
        per_person[sender] += 1
        timestamp = msg.get("timestamp_ms")
        if isinstance(timestamp, (int, float)):
            timestamp_seconds = int(timestamp) // 1000
            month = datetime.fromtimestamp(timestamp_seconds)
            month_counts[month.strftime("%b %Y")] += 1
            day_set.add(month.date())

        emojis = count_emojis(text)
        emoji_counts.update(emojis)

        if love_rx.search(text):
            love_counts[sender] += 1
        if miss_rx.search(text):
            missed += 1
        heart_total += len(heart_rx.findall(text))

    total_messages = sum(per_person.values())
    most_active_month = month_counts.most_common(1)[0][0] if month_counts else "—"
    average_per_day = round(total_messages / max(len(day_set), 1), 1)
    longest_streak = 0
    current_streak = 0
    sorted_days = sorted(day_set)
    previous_day = None
    for current_day in sorted_days:
        if previous_day and (current_day - previous_day).days == 1:
            current_streak += 1
        else:
            current_streak = 1
        longest_streak = max(longest_streak, current_streak)
        previous_day = current_day

    return {
        "totalMessages": total_messages,
        "fileCount": len(sorted(CHAT_DIR.glob("*.json"))),
        "averagePerDay": f"{average_per_day:.1f}",
        "loved": sum(love_counts.values()),
        "heartTotal": heart_total,
        "missed": missed,
        "mostActiveMonth": most_active_month,
        "longestStreak": longest_streak,
        "totalDays": len(day_set),
        "perPerson": dict(per_person),
        "loveCounts": dict(love_counts),
        "topEmojis": [
            {"emoji": emoji, "count": count}
            for emoji, count in emoji_counts.most_common(6)
        ],
    }


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    messages = load_chats()
    summary = summarize(messages)
    print(json.dumps(summary, indent=2, ensure_ascii=False))

    with OUTPUT_FILE.open("w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
    print(f"Saved static Instagram stats to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
