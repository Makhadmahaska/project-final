```mermaid
erDiagram
    Feedback {
        INT id PK
        STRING name
        STRING email
        STRING category
        INT rating
        STRING message
        BOOLEAN notify
        DATETIME createdAt
    }

```