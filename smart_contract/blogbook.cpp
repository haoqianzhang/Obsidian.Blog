#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

class blogbook : public eosio::contract {
  public:
      blogbook(account_name s):
        contract(s), // initialization of the base class for the contract
        _blogs(s, s) // initialize the table with code and scope NB! Look up definition of code and scope
      {
      }

      /// @abi action
      void create(account_name username,const int64_t post_id, const std::string& category, const std::string& title, 
	const std::string& subtitle,const std::string& content,const uint64_t date,const std::string& image,const std::string& author,const std::string& email) {
        require_auth(username);
        // Let's make sure the primary key doesn't exist
        // _people.end() is in a way similar to null and it means that the value isn't found
        _blogs.emplace(get_self(), [&]( auto& p ) {
           p.id = _blogs.available_primary_key();
           p.post_id = post_id;
           p.category = category;
           p.title = title;
           p.subtitle = subtitle;
           p.content = content;
           p.date = date;
           p.image = image;
           p.author = author;
           p.email = email;
        });
      } 

  private: 
    // Setup the struct that represents the row in the table
    /// @abi table blog
    struct blog {
      uint64_t id; // primary key
      int64_t post_id;
      std::string category;
      std::string title;
      std::string subtitle;
      std::string content;
      uint64_t date;
      std::string image;
      std::string author;
      std::string email;

      uint64_t primary_key()const { return id; }
    };

    // We setup the table:
    /// @abi table
    typedef eosio::multi_index< N(blog), blog>  blogs;

    blogs _blogs;

};

 EOSIO_ABI( blogbook, (create) )
