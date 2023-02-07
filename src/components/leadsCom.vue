<template>
  <!-- :dense="$q.screen.lt.md" -->
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      title="LEADS"
      :rows="rows"
      :columns="columns"
      row-key="uid"
      dense
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
      v-model:selected="selected"
      :rows-per-page-options="[5, 7, 10, 15]"
      bordered="false"
    >
      <template v-slot:top-right>
        <q-input
          standout
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search Lead"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.last_checked }}
          </q-td>

          <q-td key="full_name" :props="props">
            {{ props.row.full_name }}
          </q-td>
          <q-td key="email_address" :props="props">
            {{ props.row.email_address }}
          </q-td>
          <q-td key="job_title" :props="props">
            {{ props.row.job_title }}
          </q-td>
          <q-td key="company" :props="props">
            {{ props.row.company }}
          </q-td>

          <q-td key="actions" :props="props">
            <q-btn
              color="dark"
              label="Details"
              @click="editItem(props.row)"
              size="sm"
            ></q-btn>
            <!-- <q-btn color="red" label="delete"  @click="deleteItem(props.row)" size=sm></q-btn> -->
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="show_dialog">
    <q-card style="width: 2000px; max-width: 3000px">
      <q-card-section>
        <div class="text-h6 text-center">Activity Logs</div>
      </q-card-section>

      <!-- Details Start -->

      <div
        class="fit row wrap justify-start items-start content-start q-col-gutter-none item-center"
      >
        <div class="col-3 col-xl-3 q-col-gutter-none" style="overflow: hidden">
          <q-card class="q-ma-lg">
            <q-card-section class="text-center">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                style="width: 100px"
                class="responsive"
              />
            </q-card-section>
            <q-card-section class="text-center">
              <div class="text-h6">Sara Stone</div>
              <div class="text-subtitle2 q-ma-xs">
                Sale Manager at Microsfot
              </div>
              <div class="text-subtitle2 q-ma-xs">
                <q-btn color="dark" label="Open Linkedin" size="sm"></q-btn>
              </div>
            </q-card-section>
          </q-card>

          <div class="q-ma-lg">
            <q-list bordered separator>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label overline>Phone</q-item-label>
                  <q-item-label caption>3049832423</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label overline>Email</q-item-label>
                  <q-item-label caption>Sara@gmail.com</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label overline>Address</q-item-label>
                  <q-item-label caption>Munch germany</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label overline>Job Title</q-item-label>
                  <q-item-label caption>Sale Manager</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label overline>Company</q-item-label>
                  <q-item-label caption>Microsoft</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label overline>Linkedin</q-item-label>
                  <q-item-label caption>linkedin.com</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div
          class="col-9 col-xl-8 q-col-gutter-none q-mt-sm"
          style="overflow: hidden"
        >
          <div class="q-pa-md">
            <q-btn-group spread>
              <q-btn label="12 May,2022@12:30 PM" />
              <q-btn label="Sale Assistant" icon="work_off" />
              <q-btn label="" icon="east" />
              <q-btn label="Sale Manager" icon="work" />
              <q-btn
                outline
                color="positive"
                label="Title Witcher"
                icon="sync"
              />
            </q-btn-group>
          </div>
          <div class="q-pa-md">
            <q-btn-group spread>
              <q-btn label="16 Jan,2019@12:30 PM" />
              <q-btn label="Amazon" icon="domain_disabled" />
              <q-btn label="" icon="east" />
              <q-btn label="Microsfot" icon="business" />
              <q-btn
                outline
                color="accent"
                label="Company Witcher"
                icon="sync"
              />
            </q-btn-group>
          </div>
        </div>
      </div>

      <!-- Details END -->

      <q-card-actions align="center">
        <!-- <q-btn flat label="OK" color="primary" v-close-popup @click="addRow" ></q-btn> -->
        <div class="text-center">
          <q-btn
            outline
            dense
            color="grey-8"
            v-close-popup
            label="Close"
            @click="addRow"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, onMounted } from "vue";
// import API from 'src/api'

import { exportFile, useQuasar } from "quasar";
// import framesImp1 from './framesImp1'

let originalRows = [];

const printWindow = function (headers, data, title) {
  var printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write(`<html><head><title>${title}</title>`);
  printWindow.document.write('<style type = "text/css">');
  printWindow.document.write(".q-table {");
  printWindow.document.write("width: 100%;");
  printWindow.document.write("max-width: 100%;");
  printWindow.document.write("border-collapse: collapse;");
  printWindow.document.write("margin: 25px 0;");
  printWindow.document.write("font-size: 0.9em;");
  printWindow.document.write("font-family: sans-serif;");
  printWindow.document.write("box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);");
  printWindow.document.write("}");
  printWindow.document.write(".q-table th, td {");
  printWindow.document.write("padding: 12px 15px;");
  printWindow.document.write("}");
  printWindow.document.write(".q-table tbody tr {");
  printWindow.document.write("border-bottom: 1px solid #dddddd;");
  printWindow.document.write("}");
  printWindow.document.write(".q-table thead tr {");
  printWindow.document.write("text-align: left;");
  printWindow.document.write("}");
  printWindow.document.write("</style>");
  printWindow.document.write("</head>");

  printWindow.document.write("<body>");
  printWindow.document.write('<table class="q-table">');
  printWindow.document.write(`<h3>Camera Details</h3>`);
  printWindow.document.write(`<a>Printed Date:</a>`);
  printWindow.document.write(`<hr>`);
  printWindow.document.write("<thead>");
  printWindow.document.write("<tr>");

  for (const header of headers) {
    if (header !== "Actions") {
      printWindow.document.write(`<th>${header}</th>`);
    }
  }
  printWindow.document.write("</tr>");
  printWindow.document.write("</thead>");
  printWindow.document.write("<tbody>");
  for (const row of data) {
    printWindow.document.write("<tr>");
    for (const col of row) {
      printWindow.document.write(`<td>${col}</td>`);
    }
    printWindow.document.write("</tr>");
  }
  printWindow.document.write("</tbody>");
  printWindow.document.write("</table>");
  printWindow.document.write("</body>");

  printWindow.document.write("</html>");
  printWindow.document.close();

  const afterPrintHandler = (function (vm) {
    return function () {
      printWindow.close();
    };
  })(this);
  printWindow.onafterprint = afterPrintHandler;
  printWindow.print();
};

const pdfMaker = function (headers, data, title) {
  var printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write(`<html><head><title>${title}</title>`);
  printWindow.document.write('<style type = "text/css">');
  printWindow.document.write(".q-table {");
  printWindow.document.write("width: 100%;");
  printWindow.document.write("max-width: 100%;");
  printWindow.document.write("border-collapse: collapse;");
  printWindow.document.write("margin: 25px 0;");
  printWindow.document.write("font-size: 0.9em;");
  printWindow.document.write("font-family: sans-serif;");
  printWindow.document.write("box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);");
  printWindow.document.write("}");
  printWindow.document.write(".q-table th, td {");
  printWindow.document.write("padding: 12px 15px;");
  printWindow.document.write("}");
  printWindow.document.write(".q-table tbody tr {");
  printWindow.document.write("border-bottom: 1px solid #dddddd;");
  printWindow.document.write("}");
  printWindow.document.write(".q-table thead tr {");
  printWindow.document.write("text-align: left;");
  printWindow.document.write("}");
  printWindow.document.write("</style>");
  printWindow.document.write("</head>");

  printWindow.document.write("<body>");
  printWindow.document.write('<table class="q-table">');
  printWindow.document.write("<thead>");
  printWindow.document.write("<tr>");

  for (const header of headers) {
    if (header !== "Actions") {
      printWindow.document.write(`<th>${header}</th>`);
    }
  }
  printWindow.document.write("</tr>");
  printWindow.document.write("</thead>");
  printWindow.document.write("<tbody>");
  for (const row of data) {
    printWindow.document.write("<tr>");
    for (const col of row) {
      printWindow.document.write(`<td>${col}</td>`);
    }
    printWindow.document.write("</tr>");
  }
  printWindow.document.write("</tbody>");
  printWindow.document.write("</table>");
  printWindow.document.write("</body>");

  printWindow.document.write("</html>");
  printWindow.document.close();

  const afterLoadDataScreen = (function (vm) {
    return function () {
      printWindow.close();
    };
  })(this);

  printWindow.onloadeddata = afterLoadDataScreen;

  var markup = printWindow.document.documentElement.innerHTML;
  var pdf = new jsPDF("p", "pt", "A4");
  pdf.html(markup, {
    margin: [40, 60, 40, 60],
    callback: function () {
      pdf.save("PDF_" + Math.random().toString(6).slice(2) + ".pdf");
      printWindow.close();
    },
  });
};

const columns = [
  {
    name: "desc",
    required: true,
    label: "Last Checked",
    align: "center",
    field: (row) => row.last_checked,
    format: (val) => `${val}`,
    sortable: true,
    headerStyle: "20px",
  },

  {
    name: "full_name",
    align: "center",
    label: "Full Name",
    field: "full_name",
    sortable: true,
  },
  {
    name: "email_address",
    align: "center",
    label: "Email Address",
    field: "email_address",
    sortable: true,
  },
  {
    name: "job_title",
    align: "center",
    label: "Job Title",
    field: "job_title",
    sortable: true,
  },
  {
    name: "company",
    align: "center",
    label: "Company",
    field: "company",
    sortable: true,
  },
  { name: "actions", align: "center", label: "Actions", field: "actions" },
];

export default {
  components: {},
  methods: {
    async editItem(item) {
      //  this.editedIndex = this.data.indexOf(item);
      //  this.editedItem = Object.assign({}, item);
      this.show_dialog = true;
    },
  },
  setup() {
    const $q = useQuasar();
    const selected = ref([]);

    const tableRef = ref();
    const rows = ref([]);
    const filter = ref("");
    const loading = ref(false);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 15,
      rowsNumber: 15,
    });

    function wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      formatted = formatted.split('"').join('""');
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return formatted;
    }

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    async function fetchFromServer(
      startRow,
      count,
      filter,
      sortBy,
      descending
    ) {
      originalRows = await API("auth.findcamip", { filter });
      const data = originalRows;

      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === "desc"
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }

      return data.slice(startRow, startRow + count);
    }

    // emulate 'SELECT count(*) FROM ...WHERE...'
    function getRowsNumberCount() {
      return originalRows.length;
    }

    function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      // emulate server
      setTimeout(async () => {
        // update rowsCount with appropriate value
        pagination.value.rowsNumber = getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        // fetch data from "server"
        const returnedData = await fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending
        );
        console.log({
          returnedData,
        });
        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData);

        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;

        // ...and turn of loading indicator
        loading.value = false;
      }, 1500);
    }

    onMounted(() => {
      // get initial data from server (1st page)
      tableRef.value.requestServerInteraction();
    });
    return {
      show_dialog: ref(false),
      editedIndex: -1,
      editedItem: ref({
        uid: ref(""),
        last_checked: ref(""),
        full_name: ref(""),
        email_address: ref(""),
        job_title: ref(""),
        company: ref(""),
      }),
      tableRef,
      filter,
      loading,
      pagination,
      columns,
      rows,
      onRequest,
      today: ref(false),
      selected,

      showNotif(x) {
        if (x.length >= 1) {
        } else {
          $q.notify({
            message: "please Make selection First.",
            color: "red",
            icon: "announcement",
          });
        }
      },

      //print table
      printTable: function (props) {
        const headers = columns.map((col) => wrapCsvValue(col.label));

        const content = selected.value.map((row) =>
          columns.map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[typeof col.field === "undefined" ? col.name : col.field],
              col.format
            )
          )
        );

        printWindow(headers, content, "Report");
      },

      //download pdf
      downlodPDF() {
        const headers = columns.map((col) => wrapCsvValue(col.label));
        const content = selected.value.map((row) =>
          columns.map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[typeof col.field === "undefined" ? col.name : col.field],
              col.format
            )
          )
        );

        pdfMaker(headers, content, "Report");
      },
      exportTable() {
        // naive encoding to csv format
        const content = [columns.map((col) => wrapCsvValue(col.label))]
          .concat(
            selected.value.map((row) =>
              columns
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format,
                    row
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");

        const status = exportFile("Report.csv", content, "text/csv");

        if (status !== true) {
          $q.notify({
            message: "Browser denied file download...",
            color: "negative",
            icon: "warning",
          });
        }
      },
    };
  },
};
</script>
