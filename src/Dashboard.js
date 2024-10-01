import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/posts'); // Slim API endpointi
                console.log(response.data); // Yanıtı konsola yazdır
                setPosts(response.data); // Verileri durum değişkenine ayarla
            } catch (error) {
                console.error('Error fetching posts:', error); // Hata mesajını konsola yazdır
            }
        };

        fetchPosts(); // Fonksiyonu çağır
    }, []); // Boş bağımlılık dizisi ile bileşen yüklendiğinde yalnızca bir kez çalışır

    const deletePost = async (id) => {
        await axios.delete(`http://localhost:8000/api/posts/${id}`);
        setPosts(posts.filter(post => post.id !== id)); // Silindikten sonra listeyi güncelle
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Body</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell>{post.userId}</TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{post.body}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="error" onClick={() => deletePost(post.id)}>
                                    &#10005;
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Dashboard;
