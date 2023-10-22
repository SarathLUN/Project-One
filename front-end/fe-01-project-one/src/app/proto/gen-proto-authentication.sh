PROJECT_ROOT="$GOPATH/src/github.com/SarathLUN/project-one/front-end/fe-01-project-one"
PROTOC_GEN_TS_PATH="$(find ${PROJECT_ROOT}/node_modules -name grpc_tools_node_protoc)"
PROTOC_OUT_DIR="./generated/"
mkdir -p ${PROTOC_OUT_DIR}
$PROTOC_GEN_TS_PATH \
      --plugin=protoc-gen-ts="${PROJECT_ROOT}/node_modules/.bin/protoc-gen-ts" \
      --js_out="import_style=commonjs,binary:${PROTOC_OUT_DIR}" \
      --ts_out="service=grpc-web:${PROTOC_OUT_DIR}" \
      authentication.proto
