-- Seed lessons

insert into lessons
(title, description, creation_meta)
values
(
    'Test',
    $description$
  Test description for generated lesson.
$description$,
    $creation_meta$
{
  "source_material": {
    "title": "Test",
    "markdown": "Test description for generated lesson."
  },
  "learner_profile": {
    "label": "7th grader",
    "age": 12,
    "reading_level": 5,
    "experience": "Has completed introductory STEM activities and basic robotics challenges.",
    "interests": ["Robotics", "Graphic novels", "Animals"]
  }
}
$creation_meta$
);
