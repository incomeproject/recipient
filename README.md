# Recipient Facing Application

Application enabling users to sign up to be a prospective recipient, configure communication preferences, and connect a bank account to receive their monthly UBI payments. Initially this is being built for [The Income Project](https://www.incomeproject.org) but we intend to open it to other like-minded organizations once it is feature complete.

## Contributing

Please review our [code of conduct](CODE_OF_CONDUCT.md) prior to engaging. You can check the [kanban](https://airtable.com/shr70PWVXBz9CHlyZ/tblLDacF1fREpCbYd) for unassigned projects that are still "To do". Feel free to reach out to via the [contact form](https://www.incomeproject.org/contact-us) (we'll have a more specific form shortly) if you have questions or want a project assigned to you.

### Requirements

- [nodejs](https://nodejs.org)
- [golang 1.20](https://go.dev/doc/install)
- A dev account with [supertokens](https://supertokens.com/) (it's free)

### Local Development

#### Setup

- From the backend folder: `go mod download`
- From the frontend folder: `npm install`

#### Running

- From the backend folder: `go run main.go`
- From the frontend folder: `npm start`
