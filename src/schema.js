const {gql} = require('apollo-server');

const typeDefs = gql`

    type Query {
        "Geting list of users"
        findUsers(page: Int = 1, perPage: Int = 5, searchQuery: String, orderBy: OrderByInput): UserPaginator!
        "Geting one user by id"
        getUser(id: ID!): User
    }

    type User {
        id: ID!
        last_name: String!
        first_name: String!
        middle_name: String!
        email: String!
        phone: String!
        role_id: Int!
        percentage: Int!
        directions: [Direction!]!
        created_at: String!
    }

    type Direction {
        id: ID!
        name: String!
    }

    type UserPaginator {
        hasMorePages: Boolean!
        data: [User]!
    }

    # Order by clause for the \`orderBy\` argument on the query \`findUsers\`.
    input OrderByInput {
        # The column that is used for ordering.
        column: String!
        # The direction that is used for ordering.
        direction: OrderByDirection!
    }

    # The available directions for ordering a list of records.
    enum OrderByDirection {
        # Sort records in ascending order.
        ASC
        # Sort records in descending order.
        DESC
    }
`;

module.exports = typeDefs;
