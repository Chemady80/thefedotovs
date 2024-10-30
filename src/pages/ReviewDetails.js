import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(documentId: $id) {
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

export default function ReviewDetails() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id}
  })

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка!</p>

  return (
      <div className='review-card'>
          <div className='rating'>{data.review.rating}</div>
          <h2>{data.review.title}</h2>

          {data.review.categories.map(c => (
          <small key={c.documentId}>{c.name}</small>
          ))}

          <ReactMarkdown>{data.review.body}</ReactMarkdown>
        </div>
  )
}
