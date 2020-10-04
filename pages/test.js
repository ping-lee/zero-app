import LazyImage from '../components/lazy-image'

function MyApp() {
    return (
      <div className="App">
        <h3>
          <a href="https://hangindev.com/blog/create-a-lazy-loading-image-component-with-react-hooks">
            Read: Create a Lazy-Loading Image Component with React Hooks
          </a>
        </h3>
        <figure>
          <LazyImage
            className="demo"
            aspectRatio={16 / 9}
            lqip="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUACYDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAQGBwEF/8QALhAAAgEDAgQEBAcAAAAAAAAAAQIDAAQRBRIGITFBBxMikTJRgbEVFkJhYnGh/8QAFgEBAQEAAAAAAAAAAAAAAAAABAMC/8QAHhEAAgICAgMAAAAAAAAAAAAAAAIBAxESITEyM1H/2gAMAwEAAhEDEQA/AKdpOiaOHUvYzs2wJkZwB860Dg/QbKxvIntLZkLyB2Dsctjn3qPZ6JqDoRHPatjphtpHuKi8TaxJwzabblliunOEO4MCRjv9aKuWbECZ1WMlz8QdJGu2MrpBDaX1uoeKbzAQe+04+/Y1n35cW5tUubGdkWT48+rDd/8Aar3F3G9xqkCx2mYIgm2RlyDI3T2PXlUHw/1S/E2oWspmWJlEkLHKq20AMA3TuOVVsqbTJiHSW1JGqcIzysQ1yylXOCUxkUr0bi6uJG3Sv8PpCh8/WlRiW+mtENe06OMBB5antzH7VmvjnaRbbaQAq8YAUj+XI/YUpSa/Ii/RXNI0Kxn8Fte1x4z+J2N5EkMwPRSUBGOn6z7D5VbdFUbEhb1RhgmG59uZ/ulKdVyjg7vZWdvNJtJcF4+eTzHKlKUAcf/Z"
            src="https://images.unsplash.com/photo-1518991791750-044b923256f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&h=630&q=80"
            alt="a woman covering face with frosted glass"
          />
          <figcaption>refresh the page to see the effect</figcaption>
        </figure>
      </div>
    );
  }
  
  export default MyApp;