const jwt = require("jsonwebtoken");

module.exports = function(req, res, next){

  const authHeader = req.headers.authorization;

  if(!authHeader){
    console.log("[AUTH] → No auth header → 401");
    return res.status(401).json({message:"Access Denied"});
  }

  const token = authHeader.startsWith('Bearer') 
    ? authHeader.slice(7) 
    : authHeader;

  console.log("[AUTH] Extracted token (first 20 chars):", token.substring(0,20) + "...");
  try{

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[AUTH] Token valid → user ID:", verified.id);
    req.user = verified;
    next();

  }catch(err){
    console.error("[AUTH] Token verification failed:", err.message);
    return res.status(400).json({message:"Invalid Token"});

  }

}