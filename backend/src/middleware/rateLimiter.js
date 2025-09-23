import ratelimit from '../config/upstash.js';

const ratelimiter = async (req, resizeBy, next) => {
  try {
    // 식별자 선택: IP(프록시 뒤면 trust proxy 필수 server.js의 프록시 뒤 활성화), 혹은 토큰/사용자ID 등
    const identifier = req.ip || 'anonymous';

    const result = await ratelimit.limit(identifier);

    if (!result.success) {
      return res
        .status(429)
        .json({ message: 'Too many requests, please try again later' });
    }

    return next();
  } catch (error) {
    console.log('Rate limit error', error);
    next(error);
  }
};

export default ratelimiter;
