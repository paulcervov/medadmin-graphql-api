const {gql} = require('apollo-server');

const typeDefs = gql`

    type Query {
        "Geting list of employers"
        findEmployers(page: Int = 1, perPage: Int = 5, searchQuery: String, orderBy: OrderByInput): EmployerPaginator!
        "Geting one employer by id"
        getEmployer(id: ID!): Employer
    }

    type EmployerPaginator {
        currentPage: Int!
        hasMorePages: Boolean!
        data: [Employer]!
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

    type Employer {
        id: ID!
        lastName: String!
        firstName: String!
        middleName: String!
        phone: String!
        genderId: Int!,
        dateOfBirth: String!
        roleId: Int!
        
        percentage: Int
        passport: Passport
        
        directions: [Direction!]
        
        createdAt: String!
        updatedAt: String!
    }
    
    type Passport {
        series: String!
        number: Int!
        dateOfIssue: String!
        issuedBy: String!
    }

    type Direction {
        id: ID!
        name: String!
    }
    

    type Mutation {
        # Storing new employer
        createEmployer(input: EmployerInput!): EmployerMutationResponse

        # Update an existing employer by id
        updateEmployer(id: ID!, input: EmployerInput!): EmployerMutationResponse
    }

    input EmployerInput {
        firstName: String!
        middleName: String!
        lastName: String!
        phone: String!
        genderId: Int!
        dateOfBirth: String!
        roleId: Int!
        percentage: Int
        passport: PassportInput
    }
    
    input PassportInput {
        series: String!
        number: Int!
        dateOfIssue: String!
        issuedBy: String!
    }
    
    interface MutationResponse {
        success: Boolean!
        message: String!
    }
    
    type EmployerMutationResponse implements MutationResponse {
        success: Boolean!
        message: String!
        employer: Employer!
    }
`;

module.exports = typeDefs;
