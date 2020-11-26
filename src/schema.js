const {gql} = require('apollo-server');

const typeDefs = gql`

    type Query {
        "Geting list of employers"
        findEmployers(page: Int = 1, perPage: Int = 5, searchQuery: String, orderBy: OrderByInput): EmployerPaginator!
        "Geting one employer by id"
        getEmployer(id: ID!): Employer
    }

    type Employer {
        id: ID!
        lastName: String!
        firstName: String!
        middleName: String!
        email: String!
        phone: String!
        genderId: Int!,
        dateOfBirth: String!
        roleId: Int!
        percentage: Int!
        directions: [Direction!]!
        deletedAt: String
        createdAt: String!
        updatedAt: String!
    }

    type Direction {
        id: ID!
        name: String!
    }

    type EmployerPaginator {
        currentPage: Int!
        hasMorePages: Boolean!
        data: [Employer]!
    }
    
    type Mutation {
        "Delete an existing employer by id"
        deleteEmployer(id: ID!): Employer
    }

    # Order by clause for the \`orderBy\` argument on the query \`findEmployers\`.
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
