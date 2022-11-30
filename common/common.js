
    const send= function (res, code, message, data ) {
        
      return res.status(200).json({
        status: {
          code: code,
          message: message,
        },
        data: data ? data : null,
      });
    }
  
export default {send};
  