export default function BodyWrapper ({ isDarkMode }) {
  document.body.style.backgroundColor = isDarkMode
    ? 'hsl(235, 21%, 11%)'
    : '#ffffff'
  return null
}
