berikut workflow n8n yang sudah saya buat untuk ditambahkan ke portofolio website ini. saya ingin ditambahkan fungsi dan tampilan workflow ini ditambahkan ke dalam kelompok "Studi Kasus & Proyek Pilihan". untuk format dan tampilan ikuti dari portofolio di Studi Kasus & Proyek Pilihan yang sudah ada sebelumnya.

workflow json:
{
  "name": "AI WhatsApp SQL Agent",
  "nodes": [
    {
      "parameters": {},
      "id": "9413b3cd-eb37-401c-8571-72159bb8199e",
      "name": "WAHA Trigger",
      "type": "@devlikeapro/n8n-nodes-waha.wahaTrigger",
      "typeVersion": 202502,
      "position": [
        -1520,
        -16
      ],
      "webhookId": "b1bb2906-1e06-40ed-a49e-9707339cb983"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "loose",
            "version": 1
          },
          "conditions": [
            {
              "leftValue": "={{ $('WAHA Trigger').item.json.payload.fromMe }}",
              "rightValue": "=false",
              "operator": {
                "type": "string",
                "operation": "equals"
              },
              "id": "c515a864-3314-4eb1-8e9f-868a76a29e76"
            }
          ],
          "combinator": "and"
        },
        "options": {
          "looseTypeValidation": true
        }
      },
      "id": "25c6d80e-ca81-4359-a0a1-480376267942",
      "name": "If",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [
        -1296,
        368
      ]
    },
    {
      "parameters": {
        "jsCode": "// 1. Mengambil teks output dari AI (bisa berupa query SQL atau jawaban umum)\nconst textOutput = $input.first().json.output || \"\";\nlet safe = true;\nlet reason = '';\nlet tipe = 'sql';\nlet jalur = 'sql';\nlet jawabanGeneral = '';\n\n// 2. Memeriksa apakah AI memberikan jawaban umum (diawali kata GENERAL:)\nif (textOutput.startsWith('GENERAL:')) {\n  safe = true;\n  tipe = 'general';\n  jalur = 'general'; // Jalur khusus untuk chat biasa\n  jawabanGeneral = textOutput.replace('GENERAL:', '').trim();\n} else {\n  // 3. Jika tidak ada kata GENERAL:, maka teks dianggap sebagai query SQL\n  const query = textOutput.toUpperCase();\n  tipe = 'sql';\n\n  // Daftar kata berbahaya yang dilarang\n  const blocked = ['DELETE', 'DROP', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE', 'CREATE'];\n  const allowedTables = ['CUSTOMERS', 'SALES'];\n\n  // Cek kata terlarang menggunakan REGEX kata utuh (\\b)\n  for (const word of blocked) {\n    // \\b memastikan kata tersebut harus berdiri sendiri sebagai satu kata utuh\n    const regex = new RegExp(`\\\\b${word}\\\\b`);\n    \n    if (regex.test(query)) {\n      safe = false;\n      reason = `Blocked keyword: ${word}`;\n      break; // Menghentikan perulangan jika sudah terbukti berbahaya\n    }\n  }\n\n  // Cek apakah query menggunakan SELECT\n  if (!query.includes('SELECT')) {\n    safe = false;\n    reason = 'Only SELECT queries allowed';\n  }\n\n  // Cek apakah tabel yang diakses diizinkan\n  const hasAllowedTable = allowedTables.some(t => query.includes(t));\n  if (!hasAllowedTable) {\n    safe = false;\n    reason = 'Table not allowed';\n  }\n\n  // Tentukan jalur berdasarkan status keamanan SQL\n  jalur = safe ? 'sql' : 'blokir';\n}\n\n// 4. Mengembalikan data hasil analisis ke node n8n berikutnya\nreturn [{\n  json: {\n    safe,\n    tipe,\n    jalur,\n    reason,\n    query: textOutput,\n    jawaban: tipe === 'general' ? jawabanGeneral : textOutput\n  }\n}];"
      },
      "id": "24fff940-e4f3-482e-81e4-a4cda50d99ef",
      "name": "SQL Validator",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -496,
        368
      ]
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "{{ $json.query }}",
        "options": {}
      },
      "id": "b194816a-5a64-4949-8a24-dae74d69916e",
      "name": "Execute SQL",
      "type": "n8n-nodes-base.microsoftSql",
      "typeVersion": 1,
      "position": [
        -48,
        128
      ],
      "credentials": {
        "microsoftSql": {
          "id": "DvQd10rJ3C5NKN5j",
          "name": "Microsoft SQL account"
        }
      }
    },
    {
      "parameters": {
        "prompt": "=Ubah data mentah dari database berikut menjadi kalimat jawaban WhatsApp yang ramah, sopan, dan natural dalam bahasa Indonesia untuk menjawab pertanyaan pengguna. hindari menggunakan kata-kata casual seperti \"Kak\", \"Gan\", \"Sis\", \"Aku\", or \"Kamu\".\n\nPertanyaan Asli Pengguna:\n{{ $('WAHA Trigger').item.json.payload.body }}\n\nData Mentah dari Database:\n{{ JSON.stringify($json) }}\n\nATURAN BALASAN:\n1. Jawab langsung intinya dengan ramah (contoh: \"Halo! Total penjualan pada...\").\n2. Jika datanya berupa angka penjualan uang, format menjadi mata uang Rupiah yang mudah dibaca (contoh: Rp 188.800.000).\n3. Jika data kosong atau tidak ditemukan, katakan dengan sopan bahwa data tidak ditemukan.\n4. JANGAN PERNAH menyebutkan istilah teknis seperti \"JSON\", \"Row\", \"Database\", \"Bracket\", atau \"Query\" kepada pengguna WhatsApp."
      },
      "id": "681e0aeb-0a95-4327-a3ff-d887a58b5ed8",
      "name": "Format Result",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.3,
      "position": [
        400,
        16
      ]
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "7efa801e-df4a-45b6-bb93-ebae3e929cb5",
      "name": "Blocked Response",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3,
      "position": [
        464,
        512
      ]
    },
    {
      "parameters": {
        "resource": "Chatting",
        "operation": "Send Text",
        "session": "default",
        "chatId": "={{ $('WAHA Trigger').item.json.payload.from }}",
        "text": "={{ $json.text || $json.jawaban }}",
        "requestOptions": {}
      },
      "id": "9c80fd67-834e-42ea-a7c8-4dbb25281655",
      "name": "Send WhatsApp",
      "type": "@devlikeapro/n8n-nodes-waha.WAHA",
      "typeVersion": 202502,
      "position": [
        752,
        368
      ],
      "credentials": {
        "wahaApi": {
          "id": "l1A3orEgpSBnsNoF",
          "name": "WAHA account"
        }
      }
    },
    {
      "parameters": {
        "model": "gpt-4.1-mini-deploy",
        "options": {}
      },
      "id": "f8a4315d-1511-4e67-8c0e-1a9dc685592b",
      "name": "Azure OpenAI Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatAzureOpenAi",
      "typeVersion": 1,
      "position": [
        480,
        240
      ],
      "credentials": {
        "azureOpenAiApi": {
          "id": "51j2wq720Caeo2Z6",
          "name": "Azure Open AI account"
        }
      }
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "loose",
                  "version": 3
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.jalur }}",
                    "rightValue": "sql",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    },
                    "id": "722357b9-c8f9-4a3d-b596-c62d3bc7b8dd"
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "sql"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "loose",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "c31f465b-2113-4898-8990-05e3a60afde4",
                    "leftValue": "={{ $json.jalur }}",
                    "rightValue": "general",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "general"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "loose",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "61599cc3-260e-4406-8b34-cde734b84e71",
                    "leftValue": "={{ $json.jalur }}",
                    "rightValue": "blokir",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "blokir"
            }
          ]
        },
        "looseTypeValidation": true,
        "options": {}
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.4,
      "position": [
        -272,
        352
      ],
      "id": "1ff6f0ae-b7ba-4e3a-9cca-391c0ee55fb6",
      "name": "Switch"
    },
    {
      "parameters": {
        "jsCode": "// 1. Mengambil semua baris riwayat chat yang dikumpulkan dari Data Table n8n\nconst rows = $input.all();\nlet historyText = \"\";\n\n// 2. Batasi riwayat: Kita hanya mengambil 6 baris obrolan terakhir agar AI tidak bingung/hemat token\nconst recentRows = rows.slice(-6);\n\n// 3. PERULANGAN: Mengubah data tabel menjadi teks percakapan beralur\nfor (const row of recentRows) {\n  // Jika role bernilai 'user', ubah label menjadi 'User'. Jika tidak, menjadi 'Assistant'\n  const speaker = row.json.role === 'user' ? 'User' : 'Assistant';\n  const message = row.json.text_message;\n  \n  // Menggabungkan teks menjadi satu string panjang dengan enter baru (\\n)\n  historyText += `[${speaker}]: ${message}\\n`;\n}\n\n// 4. Mengembalikan hasil teks gabungan ke node n8n berikutnya\nreturn [{\n  json: {\n    // Jika riwayat masih kosong (chat pertama kali), berikan teks keterangan kosong\n    chat_history: historyText || \"Belum ada riwayat obrolan sebelumnya.\"\n  }\n}];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -1072,
        368
      ],
      "id": "cf66f3bf-5076-490b-9965-6f1f3449c566",
      "name": "Format_Memory"
    },
    {
      "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "={{ $('WAHA Trigger').item.json.payload.from }}"
      },
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.4,
      "position": [
        -784,
        592
      ],
      "id": "5c50ba0e-6ffd-4285-8737-89c7495b3720",
      "name": "Simple Memory"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $('WAHA Trigger').item.json.payload.body }}",
        "options": {
          "systemMessage": "You are a strict Microsoft SQL Server query generator with contextual memory.\nYour job is to analyze the user's message and decide if it needs database data or if it is just a general question/greeting.\n\nCRITICAL: CONTEXT RESOLUTION (MEMORY RULES)\n* You MUST read the PREVIOUS CHAT HISTORY below to resolve pronouns like \"dia\", \"itu\", \"mereka\", or \"tadi\".\n* Mentally replace those pronouns with the actual customer name or topic being discussed in the history before deciding if it is a database question.\n* For example, if the history discusses \"Andi Pratama\" and the current message is \"dia ada di region mana\", you must interpret it as \"Andi Pratama ada di region mana\".\n\nPREVIOUS CHAT HISTORY:\n{{ $json.chat_history }}\n\nCRITICAL RULES FOR DATABASE QUESTIONS:\n* If the user asks about sales, customers, OR any attributes/columns inside the DATABASE SCHEMA (such as Region, PhoneNo, Quantity, TotalAmount), you MUST generate a raw Microsoft SQL Server query.\n* Start the response directly with \"SELECT\". Do not include markdown, backticks, or explanations.\n* ALWAYS use an alias named 'total' for the selected column or aggregate function (e.g., SELECT Region AS total FROM...).\n* NEVER guess or hallucinate column names. Only use what is available in the schema.\n* Allowed tables: sales, customers.\n\nSYNONYM MAPPING RULES:\n* \"no hp\", \"telepon\", \"whatsapp\", \"kontak\" -> map to column [PhoneNo]\n* \"PT\", \"toko\", \"perusahaan\", \"customer\", \"nama\" -> map to column [CustomerName]\n* \"region\", \"wilayah\", \"area\", \"lokasi\" -> map to column [Region]\n\nDATABASE SCHEMA:\n1. customers( [CustomerID], [CustomerName], [Region], [CreatedAt], [PhoneNo] )\n2. sales( [SalesID], [ProductID], [CustomerID], [Quantity], [TotalAmount], [SalesDate] )\n\n* If the user asks for a list of names, ALL names, or multiple rows (e.g., \"daftar nama customer\", \"list pelanggan\"), you MUST use the SQL Server STRING_AGG function to combine them into a single row separated by commas.\n* Example query for lists: SELECT STRING_AGG(CustomerName, ', ') AS total FROM customers;\n\n* If the user asks for data grouped \"per customer\" or \"tiap pelanggan\" along with aggregates (like total quantity/sales), you MUST join the [sales] and [customers] tables on [CustomerID].\n* To prevent n8n from looping over multiple rows, you MUST wrap the multi-row result into a single string using FOR XML PATH or STRING_AGG.\n\nDATABASE RELATIONSHIP:\n* sales.[CustomerID] joins with customers.[CustomerID]\n\nCRITICAL RULES FOR GENERAL QUESTIONS:\n* If the user greets you or asks anything NOT related to sales/customers database (even after checking the chat history), reply directly in PROFESSIONAL INDONESIAN prefixed with \"GENERAL: \".\n* ALWAYS use professional pronouns like \"Anda\". NEVER use casual words like \"Kak\", \"Gan\", \"Sis\", \"Aku\", or \"Kamu\".\n\nEXAMPLES:\nUser: berapa total penjualan hari ini\nOutput: SELECT SUM(TotalAmount) AS total FROM sales WHERE CAST(SalesDate AS DATE) = CAST(GETDATE() AS DATE);\n\nUser: dia ada di region mana (Context from history: Andi Pratama)\nOutput: SELECT Region AS total FROM customers WHERE CustomerName = 'Andi Pratama';\n\nUser: halo selamat pagi\nOutput: GENERAL: Selamat pagi. Ada yang dapat saya bantu terkait analisis data penjualan atau informasi pelanggan Anda hari ini?"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "position": [
        -848,
        368
      ],
      "id": "592d501c-8346-4a3d-a687-fb3ba2eecb5c",
      "name": "AI Agent"
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "options": {}
      },
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [
        176,
        128
      ],
      "id": "03069553-892e-4b75-98ad-6993193eb89a",
      "name": "Aggregate"
    }
  ],
  "pinData": {},
  "connections": {
    "WAHA Trigger": {
      "main": [
        [],
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [
          {
            "node": "Format_Memory",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "SQL Validator": {
      "main": [
        [
          {
            "node": "Switch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Execute SQL": {
      "main": [
        [
          {
            "node": "Aggregate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Format Result": {
      "main": [
        [
          {
            "node": "Send WhatsApp",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Blocked Response": {
      "main": [
        [
          {
            "node": "Send WhatsApp",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Azure OpenAI Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Format Result",
            "type": "ai_languageModel",
            "index": 0
          },
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Switch": {
      "main": [
        [
          {
            "node": "Execute SQL",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Send WhatsApp",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Blocked Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Format_Memory": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send WhatsApp": {
      "main": [
        []
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "SQL Validator",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Simple Memory": {
      "ai_memory": [
        [
          {
            "node": "AI Agent",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "Aggregate": {
      "main": [
        [
          {
            "node": "Format Result",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": true,
  "settings": {
    "executionOrder": "v1",
    "binaryMode": "separate",
    "timeSavedMode": "fixed",
    "timezone": "Asia/Jakarta",
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "versionId": "3cf2c97d-f263-4c78-b870-20ac938ec2e5",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "9eeaf5ced98e8342e2e3db2dc2f582c05ef486111b5ba779c1080b77d2b951b3"
  },
  "id": "r9SlcR3tvnFiJtsF",
  "tags": []
}
