const TemplateOfEmail = () => {
  const token = Math.random().toString(36).slice(2);
  return (
    <div>
      <header>
        <nav>
          <div className="logo">logo</div>
          <div className="menu">facebook</div>
        </nav>
      </header>
      <main>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
        minus similique, dolorem vero ipsam, aspernatur sunt, est corporis
        labore obcaecati cum voluptate! Quam maiores quia laudantium commodi
        architecto reprehenderit. Velit!
        <div className="token">{token}</div>
      </main>
      <style jsx>{`
        body {
          font-family: "Montserrat", sans-serif !important;
          display: flex;
          justify-content: center;
          flex-direction: column;
          background-color: #f5f5f5;
          align-items: center;
          max-width: 600px !important;
          width: 100%;
          margin: 0 auto;
          height: 100vh;
        }
        header {
          width: 100%;
          height: 50px;
          background-color: black;
          color: white;
          text-transform: uppercase;
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 50px;
          padding: 0px 10px;
        }
        .logo {
          margin-left: 20px;
        }
        .menu {
          color: white;
          text-align: left;
          margin: 0px 40px;
        }
        main {
          text-align: center;
          background-color: #fff;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 0px 0px 16px 16px;
        }
        .token {
          color: blue;
          font-weight: bold;
          font-size: 40px;
          padding: 20px;
          letter-spacing: 10px;
        }
      `}</style>
    </div>
  );
};

export default TemplateOfEmail;
