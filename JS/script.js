class User {
    constructor(){
    };
    
    async getData(user) {
        const data = await fetch(`https://jsonplaceholder.typicode.com/users/${user}`);
        return data.json();
    };

    async createElement (user) {
        let element = await document.createElement('div');
        const users_container = document.querySelector('.users-container');
        users_container.append(element);
        console.log(user);
        await element.setAttribute('class', 'name-container');
        await element.setAttribute('onclick', `generateUsers(${user.id})`);

        return element.innerHTML = `<p>${user.name}</p>`;
    };

    async outputElement(user) {
        const data = await this.getData(user);
        return Array.isArray(data) ?
            data.forEach((user) => this.createElement(user)) :
            this.removeDataUser(data);
    };

    async createDataUser (data) {
        let users_data = document.querySelector('.users-data');
        let div_data = await document.createElement('div');
        let button_posts = await document.createElement('button');
        let status = 1;

        div_data.setAttribute('class', 'user-alldata');
        button_posts.setAttribute('class', 'button');
        button_posts.addEventListener('click', () => {
            if (status == 1) {
                document.querySelector('.posts').style.display = 'flex';
                status = 0;
            } else {
                document.querySelector('.posts').style.display = 'none';
                status = 1;
            }
        });
        
        div_data.innerHTML = `<p class="text">User info:</p>
        <table>
        <tr>
        <td class="first-td">Name:</td>
        <td class="second-td">${data.name}</td>
        </tr>
        <tr>
        <td class="first-td">Username:</td>
        <td class="second-td">${data.username}</td>
        </tr>
        <tr>
        <td class="first-td">Address:</td>
        <td class="second-td">${data.address.city}, ${data.address.street}</td>
        </tr>
        <tr>
        <td class="first-td">Email:</td>
        <td class="second-td">${data.email}</td>
        </tr>
        <tr>
        <td class="first-td">Phone:</td>
        <td class="second-td">${data.phone}</td>
        </tr>
        <tr>
        <td class="first-td">Website:</td>
        <td class="second-td">${data.website}</td>
        </tr>
        </table>`;

        users_data.prepend(div_data);
        div_data.append(button_posts);

        this.createPosts(`${data.id}`);

        return button_posts.innerHTML = 'Show posts';
    }

    async createPosts(data) {
        const data_posts = await new Post().getPostsUser(data);
        let user_alldata = await document.querySelector('.user-alldata');
        let paragraph = await document.createElement('p');
        let posts_div = await document.createElement('div');

        paragraph.setAttribute('class', 'text');
        posts_div.setAttribute('class', 'posts');

        paragraph.innerHTML = "User's posts:";
        
        await data_posts.forEach((item) => {
            posts_div.innerHTML += `
            <div class="post">
            <p>${item.title}</p>
            <p>${item.body}</p>
            </div>`;
        });

        user_alldata.append(paragraph);
        user_alldata.append(posts_div);
    };
    async removeDataUser(data) {
        document.querySelector('.user-alldata').remove();
        return this.createDataUser(data);
    };
};

class Post {
    constructor() {
    };

    async getPostsUser(posts) {
        const data_posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${posts}`);
        return data_posts.json();
    };

};

const generateUsers = (id) => new User().outputElement(id);
generateUsers('');
