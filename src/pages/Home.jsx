import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);
  
    if (posts.length === 0) {
        return (
            <div class="w-full py-8 mt-10 text-center mb-36">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-6xl font-bold italic font-serif hover:text-gray-500">
                               Welcome! Login to read posts
                            </h1>

                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    return (
        <div className='w-full py-8 dm-serif-text-regular-italic'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
