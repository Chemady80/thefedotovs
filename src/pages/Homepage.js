import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const REVIEWS = gql`
  query UsersPermissionsUsers {
    usersPermissionsUsers {
        documentId
        username
        email
        user_designs {
            documentId
            Name
            ClassID
        }
    }
}
`

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div>
      {data.usersPermissionsUsers.map(review => (
        <div key={review.documentId} className="review-card">
          <div className="rating">{review.username}</div>
          <h2>{review.email}</h2>
          
        </div>
      ))}
    </div>
  )
}