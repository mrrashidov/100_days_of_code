<?php

declare(strict_types=1);

require_once __DIR__ . './../vendor/autoload.php';

use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

try {
    $todosList = [
        ['id' => 1, 'name' => 'git init', 'status' => true],
        ['id' => 2, 'name' => 'git add', 'status' => true],
        ['id' => 3, 'name' => 'git commit -m "comment for this commit"', 'status' => true],
        ['id' => 4, 'name' => 'git push', 'status' => true],
        ['id' => 5, 'name' => 'git pull request', 'status' => true],
    ];
    $todoType = new ObjectType([
        'name' => 'Todo',
        'fields' => [
            'id' => Type::nonNull(Type::id()),
            'name' => Type::string(),
            'status' => Type::boolean(),
        ],
    ]);
    $userNameType = new ObjectType([
        'name' => 'UserName',
        'fields' => [
            'nick' => Type::string(),
            'first' => Type::string(),
            'last' => Type::string(),
        ],
    ]);
    $userType = new ObjectType([
        'name' => 'User',
        'fields' => [
            'id' => Type::id(),
            'avatar' => Type::string(),
            'name' => $userNameType,
        ],
    ]);
    $queryType = new ObjectType([
        'name' => 'Query',
        'fields' => [
            'me' => [
                'type' => $userType,
                'resolve' => function() {
                    // get user from database
                    $user = [
                        'id' => '1',
                        'avatar' => 'https://avatars0.githubusercontent.com/u/1709?s=460&v=4',
                        'name' => [
                            'nick' => 'mrmuminov',
                            'first' => 'Bahriddin',
                            'last' => 'Mo\'minov',
                        ],
                    ];
                    return $user;
                },
            ],
            'todo' => [
                'type' => $todoType,
                'args' => [
                    'id' => Type::nonNull(Type::id()),
                ],
                'resolve' => function($root, $args) use ($todosList) {
                    // get users list from database
                    $todo = [
                        'id' => $args['id'],
                        'name' => 'Todo ' . $args['id'],
                        'status' => true,
                    ];
                    return $todosList[$args['id'] - 1]??$todo;
                },
            ],
            'todos' => [
                'type' => Type::listOf($todoType),
                'args' => [
                    'q' => Type::string(),
                    'page' => Type::int(),
                ],
                'resolve' => function($root, $args) use ($todosList) {
                    // get users list from database
                    return array_filter($todosList, function($todo) use ($args) {
                        if (isset($args['q']) && $args['q'] !== '') {
                            return mb_strpos($todo['name'], $args['q']) !== false;
                        }
                        return true;
                    });
                },
            ],
        ],
    ]);

    $mutationType = new ObjectType([
        'name' => 'Mutation',
        'fields' => [
            'createUser' => [
                'type' => $userType,
                'args' => [
                    'input' => [
                        'type' => $userType,
                    ],
                ],
                'resolve' => function($root, $args) {
                    // create User in database and return the new User
                    return $args['input'];
                },
            ],
            'updateUser' => [
                'type' => $userType,
                'args' => [
                    'input' => [
                        'type' => $userType,
                    ],
                ],
                'resolve' => function($root, $args) {
                    // update User and return the updated User
                    return $args['input'];
                },
            ],
            'deleteUser' => [
                'type' => $userType,
                'args' => [
                    'input' => [
                        'type' => $userType,
                    ],
                ],
                'resolve' => function($root, $args) {
                    // update User and return the updated User
                    return $args['input'];
                },
            ],
            'createTodo' => [
                'type' => $todoType,
                'args' => [
                    'input' => [
                        'type' => $todoType,
                    ],
                ],
                'resolve' => function($root, $args) {
                    // create Todo in database and return the new todo
                    return $args['input'];
                },
            ],
            'updateTodo' => [
                'type' => $todoType,
                'args' => [
                    'input' => [
                        'type' => $todoType,
                    ],
                ],
                'resolve' => function($root, $args) {
                    // update Todo and return the updated todo
                    return $args['input'];
                },
            ],
            'deleteTodo' => [
                'type' => $todoType,
                'args' => [
                    'input' => [
                        'type' => $todoType,
                    ],
                ],
                'resolve' => function($root, $args) {
                    // update Todo and return the updated todo
                    return $args['input'];
                },
            ],
        ],
    ]);


    $schema = new Schema([
        'todo' => $todoType,
        'username' => $userNameType,
        'user' => $userType,
        'query' => $queryType,
        'mutation' => $mutationType,
    ]);

    $rawInput = file_get_contents('php://input');
    if (false === $rawInput) {
        throw new RuntimeException('Failed to get php://input');
    }

    $input = json_decode($rawInput, true);
    $query = $input['query'];
    $variableValues = $input['variables'] ?? null;

    $rootValue = ['prefix' => 'You said: '];
    $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues);
    $output = $result->toArray();
} catch (Throwable $e) {
    $output = [
        'error' => [
            'message' => $e->getMessage(),
        ],
    ];
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);


/*

Query example:
Content-Type: application/json
request body: // is only one line
{
  "query": "query { me{id name{nick}} todo(id: 5){name status} todos(q: \"m\"){id name}}"
}

result:
{
	"data": {
		"me": {
			"id": "1",
			"name": {
				"nick": "mrmuminov"
			}
		},
		"todo": {
			"name": "git pull request",
			"status": true
		},
		"todos": [
			{
				"id": "3",
				"name": "git commit -m \"comment for this commit\""
			}
		]
	}
}

request curl:
curl --request POST \
  --url http://localhost:8787/ \
  --header 'Content-Type: application/json' \
  --data '{"query": "query { me{id name{nick}} todo(id: 5){name status} todos(q: \"m\"){id name}}"}'

http://localhost:8787 - is my server address
server running on command: php -S localhost:8787 ./lesson-2.php
*/