
import { AvatarIcon } from './BlogCard'
import { Link } from 'react-router-dom'

const AppBar = ({author} : {author : any }) => {
  return (
    <div className="border-b border-slate-400 justify-between items-center flex px-6 py-4">
      <Link to={"/"}>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontFamily: "'Georgia', serif",
          }}
        >
          Speech<span style={{ color: '#16a34a' }}>.</span>
        </div>
      </Link>

      <div className="flex">
        <div className="pr-2 flex flex-col justify-center">
          <Link to={'/publish'}>
            <button className="text-white  bg-green-800 box-border border border-transparent hover:bg-green-600 focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 round p-2 rounded-2xl">
              Publish
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <AvatarIcon name={author} />
        </div>
      </div>
    </div>
  );
}

export default AppBar
