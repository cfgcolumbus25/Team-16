from typing import List

def parse_courses_field(courses_text: str) -> List[str]:
    if not courses_text:
        return []
    else:
      result = []
      for course_id in courses_text.split(','):
          stripped = course_id.strip()
          if stripped:
              result.append(stripped)
      return result


def format_courses_field(course_ids: List[str]) -> str:
    if course_ids:
      return ','.join(course_ids)
    else:
       return ""