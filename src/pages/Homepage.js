import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const REVIEWS = gql`
  query GetReviews {
    reviews {
      title,
      body,
      rating,
      documentId,
      categories {
      name,
      documentId
      }
    }
  }
`

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS)

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка!</p>

  return (
    <div>
      {data.reviews.map((review,index) => (
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
