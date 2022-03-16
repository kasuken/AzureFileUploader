
# AzureFileUploader

An implementation with React and an Azure Function to upload (and encrypt) files to an Azure Blob Storage.

To deploy the solution I have implemented a GitHub Action (triggered on main branch) that publish the frontend and the backend to an Azure Static Web App.

![image](https://user-images.githubusercontent.com/2757486/158541841-e0d9af2e-a91e-4906-aef3-1526ba7c143b.png)

## Tech Stack

**Client:** React

**Server:** Azure Function, Nodejs

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/kasuken/azurefileuploader
```

Go to the project directory

```bash
  cd azurefileuploader
```

Install dependencies

```bash
  npm install
```

Run

```bash
  npm start
```
  
## License

[MIT](https://choosealicense.com/licenses/mit/)

  
## Authors

- [@kasuken](https://www.github.com/kasuken)
