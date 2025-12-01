export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center text-muted py-3 border-top">
      &copy; {currentYear} BookNook | All Rights Reserved
    </footer>
  );
}
