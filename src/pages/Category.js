import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORY = gql`
query GetCategory($id: ID!) {
    category(documentId: $id) {
      name,
      documentId,
            reviews{
        title,
        body,
        rating,
        documentId,
        categories {
          documentId,
          name
        }
      }
    }
  }
`

export default function Category() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id}
  })

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка!</p>

      console.log(id)

  return (
    <div>
      <h2>{ data.category.name}</h2>

      {data.category.reviews.map(review => (
        <div key={review.documentId} className='review-card'>
          <div className='rating'>{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map(c => (
          <small key={c.documentId}>{c.name}</small>
          ))}

          <p>{review.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.documentId}`}>Подробнее</Link>
        </div>
      ))}
    </div>
  )
}
