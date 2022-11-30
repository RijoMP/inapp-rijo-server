# inapp-rijo-server

1. Clone the Git repo to local
2. install the dependencies using 'npm install' or 'yarn install'
3. Make sure mongo is running. The mongo db url and Port is configured in the .env file. Rename the .env.js to .env to use the existing configs
4. The API documentation shared in the JSON file 'POSTMAN.json'. Import it in postman to get the APIs and sample request responses
5. APIs        
      ## i. Get all the videos list 
            
            
              request body: 
                         {
                             }
              response: {
                           ** "_id":  **
                                     description: unique id of the video. Type: string
                           ** "name":  **
                                     description: name of the video. Type: string 
                           ** "sourceUrl":  **
                                      description: from where the video downloaded. Type: string
                           ** "size":  **
                                      description: size of the video. Type: number
                           ** "localUrl": ** 
                                      description: remote access url of the video. Type: string
                           ** "uploadedBy":  **
                                      description: user id of the  uploader. Type: string
                           ** "isDeleted":  **
                                      description: URL of the video. Type: Boolean
                           ** "createdAt":  **
                                      description: created time of the video. Type: date string
                           ** "updatedAt":  **
                                      description: last updated time of the videoo. Type: date string
                            }
                            
      ## ii. Upload a video 
         
         
              request body: 
                              {
                             ** "url": **
                                    description: URL of the video. Type: string
                             ** "name":**
                                    description: Name the video. Type: string
                             ** "uid": **
                                    description: user id of of the user. Type: string
                              }
              response: {
                           
                            }
 6. The man collection is shared in the Repo
