import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORIES = gql`
  query GetCategories {
    categories {
      name,
      documentId
    }
  }
`

export default function SiteHeader() {
  const { loading, error, data } = useQuery(CATEGORIES)

  if (loading) return <p>Загрузка категорий...</p>
  if (error) return <p>Ошибка категорий!</p>

  return (
    <div className="site-header">
        <Link to="/"><h1>Иван Федотов</h1></Link>
        <nav className='categories'>
          <span>Фильтровать статьи по категории:</span>
          {data.categories.map(category => (
            <Link key={category.documentId} to={`/category/${category.documentId}`}>
              {category.name}
            </Link>
          ))}
        </nav>
    </div>
  )
}
