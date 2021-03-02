package umm3601.todo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;

/**
 * Tests the logic of the TodoController
 *
 * @throws IOException
 */
public class TodoControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private TodoController todoController;
  private ObjectId eefsId;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
    MongoClientSettings.builder()
    .applyToClusterSettings(builder ->
    builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
    .build());

    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setupEach() throws IOException {
    //Reset our mock request and response objects.
    mockReq.resetAll();
    mockRes.resetAll();

    //Setup Database.
    MongoCollection<Document> todoDocuments = db.getCollection("todos");
    todoDocuments.drop();
    List<Document> testTodos = new ArrayList<>();
    testTodos.add(
      new Document()
      .append("owner", "Phil")
      .append("status", false)
      .append("category", "videogame")
      .append("body","lorem impsum sortum"));
    testTodos.add(
      new Document()
      .append("owner", "John")
      .append("status", true)
      .append("category", "projects")
      .append("body", "ipsum loruem phospate buillion"));
    testTodos.add(
      new Document()
      .append("owner", "Mark")
      .append("status", false)
      .append("category", "videogame")
      .append("body", "projected use up 3%"));
  eefsId = new ObjectId();
  Document eef =
    new Document()
    .append("_id", eefsId)
    .append("name", "Eef")
    .append("status", true)
    .append("category", "projects")
    .append("body", "create new project");

  todoDocuments.insertMany(testTodos);
  todoDocuments.insertOne(eef);

  todoController = new TodoController(db);
  }

  @AfterAll
  public static void teardown(){
    db.drop();
    mongoClient.close();
  }


}
