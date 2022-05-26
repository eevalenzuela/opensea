import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Layout } from '../layout/index';
import Box from '../components/box';

const fetchCollection = async (collectionSlug) => {
  let data = null;
  try {
    const options = { method: 'GET' };
    const response = await fetch(
      `https://api.opensea.io/api/v1/collection/${collectionSlug}`,
      options
    );
    data = await response.json();
  } catch (error) {
    data = {};
  }
  return data;
};

const Dashboard = () => {
  const [collectionSlug, setCollectionSlug] = useState('doodles-official');

  const [state, setState] = useState({
    description: '',
    paymentTokens: [],
    twitterUsername: '',
  });

  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const searchCollection = async () => {
    const data = await fetchCollection(collectionSlug);
    if (data.collection) {
      const { description, payment_tokens, twitter_username } = data.collection;
      setIsDataAvailable(true);
      setState({
        description: description,
        paymentTokens: payment_tokens,
        twitterUsername: twitter_username,
      });
    } else {
      setIsDataAvailable(false);
      setState({
        description: '',
        paymentTokens: [],
        twitterUsername: '',
      });
    }
  };

  useEffect(() => {
    searchCollection();
  }, []);

  return (
    <Layout>
      <Box title="Dashboard">
        <div className="mx-auto max-w-lg py-6">
          <div>
            <div className="text-center">
              <Image src="/opensea.png" alt="" width={45} height={45} />
              <h2 className="mt-1 text-2xl font-medium text-gray-900">
                OpenSea
              </h2>
              <p className="text-md mt-1 text-gray-500">
                OpenSea is the world&apos;s first and largest NFT marketplace
              </p>
            </div>
            <div className="mt-4 flex">
              <label htmlFor="email" className="sr-only">
                collection
              </label>
              <input
                className="block w-full	rounded-md border border-slate-600  pl-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search items, collections, and accounts"
                defaultValue={'doodles-official'}
                onChange={(event) => {
                  setCollectionSlug(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    searchCollection();
                  }
                }}
              />
              <button
                className="ml-4 flex-shrink-0 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={searchCollection}
              >
                Search
              </button>
            </div>
          </div>
          {!isDataAvailable && (
            <h3 className="text-md mx-auto mt-4 font-semibold uppercase tracking-wide text-gray-900">
              No data Available
            </h3>
          )}
          {isDataAvailable && (
            <div className="mt-6">
              <h3 className="text-md font-semibold capitalize tracking-wide text-gray-900">
                {state.description}
              </h3>
              <br />
              {state.twitterUsername && (
                <h3 className="text-md font-semibold capitalize tracking-wide text-gray-900">
                  <span>
                    twitter:{' '}
                    <a
                      className="lowercase text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                      href={`https://www.twitter.com/${state.twitterUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`https://www.twitter.com/${state.twitterUsername}`}
                    </a>
                  </span>
                </h3>
              )}
              <br />
              {state.paymentTokens && (
                <>
                  <h3 className="text-md font-semibold capitalize tracking-wide text-gray-900">
                    payment tokens:
                  </h3>
                  <ul
                    role="list"
                    className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200"
                  >
                    {state.paymentTokens.map((token) => (
                      <li
                        key={token.id}
                        className="flex items-center justify-between space-x-3 py-4"
                      >
                        <div className="flex min-w-0 flex-1 items-center space-x-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {token.name} ({token.symbol})
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </Box>
    </Layout>
  );
};

export default Dashboard;
