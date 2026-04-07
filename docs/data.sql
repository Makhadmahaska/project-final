
-- Run this after your Prisma migration has created the table.

INSERT INTO "Feedback" (
  "id",
  "name",
  "email",
  "category",
  "createdAt"
) VALUES
  (
    'Amina Yusuf',
    'amina@example.com',
    'feature-request',
    5,
    'The feedback dashboard is clear and fast. Export filters would make it even better.',
    true,
    '2026-03-24T09:15:00.000Z'
    3,
    'mahad',
    'abdi@gmail.com',
    'improvement',
    1,
    'mmmmmm',
    false,
    '2026-03-25T20:16:05.439Z'
  ),
  (
    'Noah Berg',
    'noah@example.com',
    'bug-report',
    2,
    'Submitting feedback worked, but the success message disappeared too quickly on mobile.',
    false,
    '2026-03-25T13:42:00.000Z'
    'nacad',
    'nacas@gmail.com',
    'improvement',
    2,
    'ma hayo',
    true,
    '2026-03-25T02:22:13.958Z'
  ),
  (
    'Layla Hassan',
    'layla@example.com',
    'general',
    4,
    'Clean UI and simple flow. I would like to sort feedback by category in the admin view.',
    true,
    '2026-03-26T16:05:00.000Z'
    1,
    'abdi',
    'mahad@gmail.com',
    'improvement',
    2,
    'baxad ku daratta talo',
    false,
    '2026-03-25T02:19:34.285Z'
  );

SELECT setval(
  pg_get_serial_sequence('"Feedback"', 'id'),
  COALESCE((SELECT MAX("id") FROM "Feedback"), 1)
);