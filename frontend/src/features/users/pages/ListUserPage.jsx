import { useState } from "react"
import { DataTable, Button } from "@/shared"
import { userColumns } from "../table/usersColumns.jsx"
import { users } from "../data/users.js"

import { useNavigate } from "react-router-dom"

import ReportConfigModal from "../reports/components/ReportConfigModal.jsx"

export default function ListUserPage() {

  const navigate = useNavigate()

  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  return (
    <div className="p-6">

      <h1 className="text-xl font-semibold mb-4">
        Usuarios
      </h1>

      <div className="flex justify-end gap-2 mb-4">

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsReportModalOpen(true)}
        >
          Reportar usuario
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate("/dashboard/createUser")}
        >
          Crear usuario
        </Button>

      </div>

      <ReportConfigModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* <Button 
      onClick={handleGenerateReport}>
      Generar reporte
      </Button> */}

      <DataTable
        data={users}
        columns={userColumns}
      />


    </div>
  )
}