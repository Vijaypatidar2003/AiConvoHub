import Redis from "ioredis";

const redisClient = new Redis({
    host:"redis-11733.c74.us-east-1-4.ec2.redns.redis-cloud.com",
    port:11733,
    password:"CMjVUT9qH69DbGs2Bhta0CNyStIjYICk"
})

redisClient.on('connect',()=>{
    console.log('redis connected')
})

export default redisClient;