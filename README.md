# Recipient Facing Application

Application enabling users to sign up to be a prospective recipient, configure communication preferences, and connect a bank account to receive their monthly UBI payments. Initially this is being built for [The Income Project](https://www.incomeproject.org) but we intend to open it to other like-minded organizations once it is feature complete.

## Contributing

Please review our [code of conduct](CODE_OF_CONDUCT.md) prior to engaging. You can check the [kanban](https://airtable.com/shr70PWVXBz9CHlyZ/tblLDacF1fREpCbYd) for unassigned projects that are still "To do". Feel free to reach out to via the [contact form](https://www.incomeproject.org/contact-us) (we'll have a more specific form shortly) if you have questions or want a project assigned to you.

### Requirements

- [nodejs](https://nodejs.org)
- [docker](https://docs.docker.com/get-docker/)
- A dev account with [supertokens](https://supertokens.com/) (it's free)

### Local Development

- To run the backend:
  - `cp .secrets.env.example .secrets.env`
  - Update .secrets.env with the appropriate values
  - `docker compose build`
  - `docker compose up`
  - Changes made will trigger a re-compile
- To run the frontend:
  - `cd frontend && npm install`
  - `npm start`
