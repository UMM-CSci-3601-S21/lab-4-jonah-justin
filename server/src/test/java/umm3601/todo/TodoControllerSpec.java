package umm3601.todo;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.javalin.plugin.json.JavalinJson;
import io.javalin.http.Context;
import io.javalin.http.util.ContextUtil;

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
    .append("owner", "Eef")
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

  @Test
  public void GetAllTodos() throws IOException {

    //Create fake Javalin context.
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");
    todoController.getTodos(ctx);

    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();
    assertEquals(db.getCollection("todos").countDocuments(), JavalinJson.fromJson(result, Todo[].class).length);
  }

  @Test
  public void getTodosByBody() throws IOException {

    //set query string to test with
    mockReq.setQueryString("body=create new project");

    //Create fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");

    todoController.getTodos(ctx);

    //The response status should be OK
    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

    assertEquals(1, resultTodos.length); //There should be 1 todo return
    for (Todo todo : resultTodos) {
      assertEquals("create new project", todo.body); //It should be owned by phil.
    }
  }

  @Test
  public void getTodosByOwner() throws IOException {

    // Set the query string to test with.
    mockReq.setQueryString("owner=Phil");

    // Create fake Javalin context.
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");

    todoController.getTodos(ctx);

    // Ensure OK response (http).
    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

    assertEquals(1, resultTodos.length);
    for (Todo todo : resultTodos) {
      assertEquals("Phil", todo.owner);
    }
  }

  @Test
  public void getTodosByOwnerAndBody() throws IOException {

    mockReq.setQueryString("owner=Phil&body=lorem impsum sortum");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/todos");
    todoController.getTodos(ctx);

    // Ensure response OK
    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();
    Todo[] resultTodos = JavalinJson.fromJson(result, Todo[].class);

    // There should be one returned todo.
    assertEquals(1, resultTodos.length);
    for (Todo todo : resultTodos) {
      assertEquals("lorem impsum sortum", todo.body);
      assertEquals("Phil", todo.owner);
    }
  }

}
