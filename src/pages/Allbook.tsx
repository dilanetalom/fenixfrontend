import React, { useEffect, useState } from 'react'
import { getAllBooks } from '../service/bookservice';
import { Link } from 'react-router-dom';

function Allbook() {

   
    const token = localStorage.getItem('authToken'); // Récupérer le token
    const [books, setBooks] = useState<any[]>([]);
    const [filter, setFilter] = useState({
        title: '',
        author: '',
        publishedDate: '',
        price: ''
    });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const result = await getAllBooks(token);
                setBooks(result);
                
            } catch (error) {
                // setError(error.message);
                console.log("erreur");
                
            }
        };

        fetchBooks();
    }, [token]);

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }


    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedFilter = { ...filter, [name]: value };
        setFilter(updatedFilter);
    
        // Filtrer les livres
        // const filtered = books.filter(book => {
        //     const titleMatch = book.title && book.title.toLowerCase().includes(updatedFilter.title.toLowerCase()) || !updatedFilter.title;
        //     const authorMatch = typeof book.author === 'string' && book.author.toLowerCase().includes(updatedFilter.author.toLowerCase()) || !updatedFilter.author;
        //     const publishedDateMatch = book.publishedDate && book.publishedDate.includes(updatedFilter.publishedDate) || !updatedFilter.publishedDate;
        //     const priceMatch = book.price !== undefined && book.price.toString().includes(updatedFilter.price) || !updatedFilter.price;
    
        //     return titleMatch && authorMatch && publishedDateMatch && priceMatch;
        // });
    
   
       
        
        // Affiche les livres filtrés
    };


  return (
    <div>

      <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Liste des Livres</h1>
            <a href="/booksave">Ajouter un livre</a>
            <div className="flex flex-wrap mb-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Titre"
                    className="border rounded p-2 m-2 w-1/4"
                    value={filter.title}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Auteur"
                    className="border rounded p-2 m-2 w-1/4"
                    value={filter.author}
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    name="publishedDate"
                    className="border rounded p-2 m-2 w-1/4"
                    value={filter.publishedDate}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Prix"
                    className="border rounded p-2 m-2 w-1/4"
                    value={filter.price}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books.map((book) => (
                    <Link  to={`/bookbyid/${book.id}`} key={book.id} className="border rounded-lg shadow-lg p-4 cursor-pointer">
                        <img 
                            src={`http://127.0.0.1:8000/${book.image}`} 
                            alt={book.title} 
                            className="w-full h-48 object-cover mb-2 rounded" 
                        />
                        <h2 className="text-xl font-semibold">{book.title}</h2>
                      
                        <p className="text-gray-600">Publié le: {book.pub_date}</p>
                        <p className="text-gray-600">Prix: ${book.price}</p>
                        <p className="text-gray-600 flex justify-between items-center">
                            <span>Auteur: {book.author.name}</span>
                            <span> <img 
                            src={`http://127.0.0.1:8000/${book.author.imageauthor}`} 
                            alt={book.title} 
                            className="w-8 h-8 object-cover mb-2 rounded-full" 
                        /></span>
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Allbook
