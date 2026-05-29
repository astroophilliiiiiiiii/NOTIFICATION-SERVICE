## 🛠️ Steps to Create a New Project Using TS-Template

1. Clone the project 

```
git clone https://github.com/astroophilliiiiiiiii/Typescript-Template.git <Project Name>
```

2. Move into the folder structure 

```
cd <Project Name>
```
3. Install the npm dependencies 

```
npm i 
```

4. Create a new .env file in the root directory and add the PORT and MONGO_URI variables

``` 
echo -e "PORT=8085\nMONGO_URI=your_mongodb_connection_string_here" >> .env
```

5. Start the express Server 

```
npm run start
```
