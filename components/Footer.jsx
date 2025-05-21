export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 text-center shadow-inner py-4 px-2">
      <p className="text-sm">© 2025 Yash Goyal. All rights reserved.</p>
      <p className="mt-1">
        <a
          href="https://www.linkedin.com/in/yash-goyal-8642b1253/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mx-2"
        >
          LinkedIn
        </a>
        |
        <a
          href="https://github.com/ygyashgoyal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:underline mx-2"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
