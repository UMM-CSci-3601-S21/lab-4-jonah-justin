package umm3601.todo;

import static com.mongodb.client.model.Filters.regex;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import com.mongodb.client.MongoDatabase;

import org.bson.conversions.Bson;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.Context;

public class TodoController {

	private static final String OWNER_KEY = "owner";
  public TodoController(MongoDatabase database) {
    JacksonMongoCollection.builder().build(database, "todos", Todo.class);
	}

	public void getTodos(Context ctx) {

    //Start with a blank Document.
    List<Bson> filters = new ArrayList<>();

    if (ctx.queryParamMap().containsKey(OWNER_KEY)) {
      filters.add(regex(OWNER_KEY, Pattern.quote(ctx.queryParam(OWNER_KEY)), "i"));
    }
	}

}
