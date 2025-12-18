import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    const SECRET_KEY = "Abdou_SecretKey123";

    let token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "No Token" });
    }

    try {
        jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.status(401).json({ message: 'Not authorized' });
            } else {
                console.log(decodedToken);
                // req.locals.user = decodedToken.id;
                next();
            }
        });
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized' });
    }
}

export default protect;

export const chechUser = async (req, res, next) => {
    const SECRET_KEY = "Abdou_SecretKey123";

    let token = req.cookies.jwt;

    if (token) {
        try {
            jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    req.locals.user = null;
                    return res.status(401).json({ message: 'Not authorized' });
                } else {
                    console.log(decodedToken);
                    req.locals.user = decodedToken.id;
                    next();
                }
            });
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized' });
        }
    } else {
        req.locals.user = null;
        next();
    }

}

